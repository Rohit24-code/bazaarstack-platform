import { Button } from "@ecom/ui-core";
import { Card, CardContent, CardHeader, CardTitle } from "@ecom/ui-core";
import { Input } from "@ecom/ui-core";
import { ImagePlus, Loader2 } from "lucide-react";
import React from "react";
import { settingStyles } from "./constants";
import { useAdminSettings } from "@/features/admin/Settings/hooks/useAdminSettings";
import AdminSettingsBannersTable from "@/components/admin/Settings/AdminSettingsBannersTable";
import { useQueryClient } from "@tanstack/react-query";

function AdminSettings() {
  const { items, setFiles, fileCountLabel, loading, handleUpload, uploading } =
    useAdminSettings();

  const queryClient = useQueryClient();

  return (
    <div className={settingStyles.pageWrapClass}>
      <div className={settingStyles.contentContainerClass}>
        <div className={settingStyles.uploadPanelClass}>
          <Card className={settingStyles.cardClass}>
            <CardHeader>
              <CardTitle className={settingStyles.cardTitleClass}>
                Banner Settings
              </CardTitle>
            </CardHeader>

            <CardContent className={settingStyles.cardContentClass}>
              <div className={settingStyles.uploadBoxClass}>
                <div className={settingStyles.uploadIconWrapClass}>
                  <ImagePlus className={settingStyles.uploadIconClass} />
                </div>

                <div className={settingStyles.uploadTextWrapClass}>
                  <p className={settingStyles.uploadHeadingClass}>
                    Upload Homepage Banners
                  </p>
                </div>

                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  className={settingStyles.fileInputClass}
                  onChange={(event) =>
                    setFiles(Array.from(event.target.files || []))
                  }
                  disabled={uploading}
                />

                <p className={settingStyles.fileCountClass}>{fileCountLabel}</p>

                <Button
                  className={settingStyles.fullButtonClass}
                  disabled={uploading}
                  onClick={() => handleUpload()}
                >
                  {uploading ? "Uploading..." : "Upload Banners"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className={settingStyles.cardClass}>
            <CardHeader className={settingStyles.tableHeaderClass}>
              <CardTitle className={settingStyles.cardTitleClass}>
                Current Homepage Banners
              </CardTitle>
              <Button
                className={settingStyles.buttonClass}
                disabled={loading}
                onClick={() =>
                  queryClient.invalidateQueries({
                    queryKey: ["admin", "settings", "banners"],
                  })
                }
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : null}
                Refresh
              </Button>
            </CardHeader>

            <CardContent className={settingStyles.cardContentClass}>
              {loading ? (
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading banners...</span>
                </div>
              ) : !items.length ? (
                <div className={settingStyles.emptyStateClass}>
                  No banners uploaded yet !
                </div>
              ) : (
                <AdminSettingsBannersTable items={items} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
