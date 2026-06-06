import Loader from "@/components/common/Loader"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCustomerHomeStore } from "@/features/customer/home/store"
import { formatPrice } from "@/lib/utils"
import { ArrowRight, Grid2X2, TicketPercent } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { homeStyles } from "./constant"

function StoreHome() {
  const { data, loading, loadHome } = useCustomerHomeStore((state) => state)

  useEffect(() => {
    loadHome()
  }, [loadHome])

  if (loading) {
    return <Loader />
  }

  const mainBanner = data.banners[0] || null
  const sideBanners = data.banners.slice(1, 3)

  return (
    <div className={homeStyles.pageWrapClass}>
      <div className={homeStyles.contentContainerClass}>
        <div className={homeStyles.sectionStackClass}>
          <section>
            <div className={homeStyles.bannerGridClass}>
              <Card className={homeStyles.bannerMainCardClass}>
                <img
                  src={mainBanner.imageUrl}
                  alt="Feature Image"
                  className={homeStyles.bannerMainImageClass}
                />
              </Card>

              <div className={homeStyles.bannerSideGridClass}>
                {sideBanners.map((item) => (
                  <Card
                    key={item._id}
                    className={homeStyles.bannerSideCardClass}
                  >
                    <img
                      src={item.imageUrl}
                      alt="Feature Image"
                      className={homeStyles.bannerSideImageClass}
                    />
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {!!data.categories.length ? (
            <section>
              <div className={homeStyles.sectionHeadClass}>
                <p className={homeStyles.sectionEyebrowClass}>Categories</p>
                <h2 className={homeStyles.sectionTitleClass}>
                  Browse by collection
                </h2>
              </div>

              <div className={homeStyles.categoryGridClass}>
                {data.categories.slice(0, 4).map((categoryItem) => (
                  <Link to={`/collections?category=${categoryItem._id}`}>
                    <Card className={homeStyles.categoryCardClass}>
                      <CardContent className={homeStyles.categoryContentClass}>
                        <div className={homeStyles.categoryIconWrapClass}>
                          <Grid2X2 className={homeStyles.categoryIconClass} />
                        </div>
                        <div className={homeStyles.categoryTextWrapClass}>
                          <p className={homeStyles.categoryTitleClass}>
                            {categoryItem.name}
                          </p>
                        </div>

                        <span className={homeStyles.categoryLinkClass}>
                          View Collection
                          <ArrowRight
                            className={homeStyles.categoryArrowIconClass}
                          />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {!!data.coupons.length ? (
            <section>
              <div className={homeStyles.sectionHeadClass}>
                <p className={homeStyles.sectionEyebrowClass}>Offers</p>
                <h2 className={homeStyles.sectionTitleClass}>
                  Live Coupon Cards
                </h2>
              </div>

              <div className={homeStyles.couponGridClass}>
                {data.coupons.slice(0, 4).map((coupon) => (
                  <Card className={homeStyles.couponCardClass}>
                    <CardContent className={homeStyles.couponContentClass}>
                      <div className={homeStyles.couponIconWrapClass}>
                        <TicketPercent className={homeStyles.couponIconClass} />
                      </div>
                      <Badge className={homeStyles.couponBadgeClass}>
                        {coupon.percentage}% OFF
                      </Badge>

                      <div className={homeStyles.couponCodeWrapClass}>
                        <p className={homeStyles.couponCodeLabelClass}>
                          Coupon Code
                        </p>
                        <p className={homeStyles.couponCodeClass}>
                          {coupon.code}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {!!data.recentProducts.length ? (
            <section>
              <div className={homeStyles.sectionHeadClass}>
                <p className={homeStyles.sectionEyebrowClass}>Latest</p>
                <h2 className={homeStyles.sectionTitleClass}>
                  Recent Products
                </h2>
              </div>
              <div className={homeStyles.productGridClass}>
                {data.recentProducts.slice(0, 4).map((product) => (
                  <Link to={`/collection/${product._id}`} key={product._id}>
                    <Card className={homeStyles.productCardClass}>
                      <CardContent className={homeStyles.productContentClass}>
                        <div className={homeStyles.productImageWrapClass}>
                          <img
                            src={product.image}
                            alt={product.title}
                            className={homeStyles.productImageClass}
                          />
                        </div>
                        <div className={homeStyles.productInfoWrapClass}>
                          <div className={homeStyles.productBrandRowClass}>
                            <p className={homeStyles.productBrandClass}>
                              {product.brand}
                            </p>
                          </div>
                          <p className={homeStyles.productTitleClass}>
                            {product.title}
                          </p>
                        </div>

                        <div className={homeStyles.productPriceRowClass}>
                          <div>
                            <p className={homeStyles.productPriceClass}>
                              {formatPrice(product.finalPrice)}
                            </p>
                            {product.salePercentage > 0 ? (
                              <p
                                className={homeStyles.productOriginalPriceClass}
                              >
                                {formatPrice(product.price)}
                              </p>
                            ) : null}
                          </div>

                          <span className={homeStyles.productViewClass}>
                            View
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {!!data.featuredProduct.length ? (
            <section>
              <div className={homeStyles.sectionHeadClass}>
                <p className={homeStyles.sectionEyebrowClass}>Latest</p>
                <h2 className={homeStyles.sectionTitleClass}>
                  Featured Products
                </h2>
              </div>
              <div className={homeStyles.productGridClass}>
                {data.featuredProduct.slice(0, 4).map((product) => (
                  <Link to={`/collection/${product._id}`} key={product._id}>
                    <Card className={homeStyles.productCardClass}>
                      <CardContent className={homeStyles.productContentClass}>
                        <div className={homeStyles.productImageWrapClass}>
                          <img
                            src={product.image}
                            alt={product.title}
                            className={homeStyles.productImageClass}
                          />
                        </div>
                        <div className={homeStyles.productInfoWrapClass}>
                          <div className={homeStyles.productBrandRowClass}>
                            <p className={homeStyles.productBrandClass}>
                              {product.brand}
                            </p>
                          </div>
                          <p className={homeStyles.productTitleClass}>
                            {product.title}
                          </p>
                        </div>

                        <div className={homeStyles.productPriceRowClass}>
                          <div>
                            <p className={homeStyles.productPriceClass}>
                              {formatPrice(product.finalPrice)}
                            </p>
                            {product.salePercentage > 0 ? (
                              <p
                                className={homeStyles.productOriginalPriceClass}
                              >
                                {formatPrice(product.price)}
                              </p>
                            ) : null}
                          </div>

                          <span className={homeStyles.productViewClass}>
                            View
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default StoreHome
