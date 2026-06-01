import React from "react";
import { Button, Separator } from "@ecom/ui-core";
import { useCustomerProducts } from "./hooks/useCustomerProducts";

function App() {
  const { data: products, isLoading, isError } = useCustomerProducts();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          BazaarStack Storefront
        </h1>
        <p className="text-sm text-muted-foreground">
          Federated Monorepo Architecture Integration Active.
        </p>
      </header>

      <Separator />

      {isLoading && (
        <div className="p-12 text-center text-sm font-medium animate-pulse text-muted-foreground">
          Connecting to data layers, parsing cache lines...
        </div>
      )}

      {isError && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
          Failed to establish link with backend API pipelines. Verify your
          server is operational.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-xl bg-card shadow-xs space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {product.brand}
                </p>
              </div>
              <span className="font-bold text-emerald-600">
                ${product.price}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Button size="sm">Add to Cart</Button>

              <Button variant="outline" size="sm">
                Quick Specs
              </Button>

              <div className="space-y-1">
                <p className="font-medium text-xs">
                  Size:{" "}
                  <span className="text-muted-foreground">
                    {product.size || "Standard"}
                  </span>
                </p>
                <p className="font-medium text-xs">
                  Color:{" "}
                  <span className="text-muted-foreground">
                    {product.color || "Default"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
