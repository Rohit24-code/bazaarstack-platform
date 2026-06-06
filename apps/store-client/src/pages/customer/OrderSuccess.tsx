import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { orderSuccessStyles } from "./constant";

export default function CustomerOrderSuccessPage() {
    return (
        <div className={orderSuccessStyles.pageWrapClass}>
            <div className={orderSuccessStyles.cardClass}>
                <div className={orderSuccessStyles.iconWrapClass}>
                    <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                    <h1 className={orderSuccessStyles.titleClass}>Order placed successfully</h1>
                    <p className={orderSuccessStyles.textClass}>
                        Your payment is complete and your order is confirmed.
                    </p>
                </div>

                <div className={orderSuccessStyles.buttonRowClass}>
                    <Button asChild className={orderSuccessStyles.buttonClass}>
                        <Link to="/collections">Continue shopping</Link>
                    </Button>

                    <Button asChild variant="outline" className={orderSuccessStyles.buttonClass}>
                        <Link to="/">Go to home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
