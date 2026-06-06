import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useCustomerProfileStore } from "@/features/customer/profile/store"
import { useUser } from "@clerk/react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { customerProfileStyles } from "../constants"
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cartAndCheckout/store"

function CustomerProfileDialog() {
  const {
    isOpen,
    closeProfile,
    mode,
    startAdd,
    startEdit,
    updateForm,
    cancelForm,
    saveForm,
    removeAddress,
    items,
    form,
  } = useCustomerProfileStore()

  const { points } = useCustomerCartAndCheckoutStore((state) => state)

  const { user } = useUser()

  const showForm = mode !== "none"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeProfile()}>
      <DialogContent className={customerProfileStyles.dialogClass}>
        <DialogHeader>
          <DialogTitle className={customerProfileStyles.dialogTitle}>
            Profile
          </DialogTitle>
        </DialogHeader>

        <div className={customerProfileStyles.shellClass}>
          <section className={customerProfileStyles.accountCardClass}>
            <div className={customerProfileStyles.accountRowClass}>
              <div className={customerProfileStyles.accountTextClass}>
                <h2 className={customerProfileStyles.accountTitleClass}>
                  {user?.fullName}
                </h2>
                <p className={customerProfileStyles.emailClass}>
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>

              <p className={customerProfileStyles.pointsClass}>
                Points: {points}
              </p>
            </div>
          </section>
          <div
            className={
              showForm
                ? customerProfileStyles.gridClass
                : customerProfileStyles.singleGridClass
            }
          >
            <section className={customerProfileStyles.sectionClass}>
              <div className={customerProfileStyles.sectionHeaderClass}>
                <div>
                  <h3 className={customerProfileStyles.sectionTitleClass}>
                    Saved Addresses
                  </h3>
                </div>

                <Button
                  className={customerProfileStyles.buttonClass}
                  onClick={startAdd}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Address
                </Button>
              </div>

              {!items.length ? (
                <p className={customerProfileStyles.emptyClass}>
                  No address added
                </p>
              ) : null}

              {items.length ? (
                <div className={customerProfileStyles.listClass}>
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className={customerProfileStyles.itemClass}
                    >
                      <div className={customerProfileStyles.itemTopClass}>
                        <div className={customerProfileStyles.itemTextClass}>
                          <p>{item.fullName}</p>

                          {item?.isDefault ? (
                            <span
                              className={customerProfileStyles.defaultClass}
                            >
                              Default
                            </span>
                          ) : null}
                        </div>

                        <p className={customerProfileStyles.addressClass}>
                          {item.address}, {item.state}, {item.postalCode}
                        </p>
                      </div>
                      <div className={customerProfileStyles.actionRowClass}>
                        <Button
                          type="button"
                          variant={"default"}
                          className={customerProfileStyles.buttonClass}
                          onClick={() => startEdit(item)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant={"default"}
                          className={customerProfileStyles.buttonClass}
                          onClick={() => removeAddress(item._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>

            {/* form render here */}
            {showForm ? (
              <section className={customerProfileStyles.formWrapClass}>
                <h3 className={customerProfileStyles.sectionTitleClass}>
                  {mode === "edit" ? "Edit Address" : "Add Address"}
                </h3>

                <div className={customerProfileStyles.twoColumnClass}>
                  <div className={customerProfileStyles.fieldClass}>
                    <Label>Full Name</Label>
                    <Input
                      className={customerProfileStyles.inputClass}
                      value={form.fullName}
                      onChange={(e) => updateForm("fullName", e.target.value)}
                      placeholder="Full Name"
                    />
                  </div>
                  <div className={customerProfileStyles.fieldClass}>
                    <Label>Address</Label>
                    <Input
                      className={customerProfileStyles.inputClass}
                      value={form.address}
                      onChange={(e) => updateForm("address", e.target.value)}
                      placeholder="Address"
                    />
                  </div>
                </div>
                <div className={customerProfileStyles.twoColumnClass}>
                  <div className={customerProfileStyles.fieldClass}>
                    <Label>State</Label>
                    <Input
                      className={customerProfileStyles.inputClass}
                      value={form.state}
                      onChange={(e) => updateForm("state", e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div className={customerProfileStyles.fieldClass}>
                    <Label>Postal Code</Label>
                    <Input
                      className={customerProfileStyles.inputClass}
                      value={form.postalCode}
                      onChange={(e) => updateForm("postalCode", e.target.value)}
                      placeholder="Postal Code"
                    />
                  </div>
                </div>

                <label className={customerProfileStyles.checkboxRowClass}>
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(event) =>
                      updateForm("isDefault", event.target.checked)
                    }
                    className={customerProfileStyles.checkboxClass}
                  />
                  <span>Set as default address</span>
                </label>
                <div className={customerProfileStyles.formActionsClass}>
                  <Button
                    type="button"
                    variant={"outline"}
                    className={customerProfileStyles.buttonClass}
                    onClick={cancelForm}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    variant={"default"}
                    className={customerProfileStyles.buttonClass}
                    onClick={() => void saveForm()}
                  >
                    {mode === "edit" ? "Update Address" : "Save Address"}
                  </Button>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerProfileDialog
