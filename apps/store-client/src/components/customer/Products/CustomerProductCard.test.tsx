/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CustomerProductCard from "./CustomerProductCard"; // Adjust this import if your file name differs slightly
import { CustomerProduct } from "@ecom/api-client/src/types/products";

// ============================================================================
// 🏛️ CENTRALIZED MOCK DEFAULTS & WRAPPER
// ============================================================================

// A complete, valid baseline object that perfectly satisfies the rigid CustomerProduct type [cite: 309, 325]
const defaultProductBaseline: CustomerProduct | any = {
  _id: "mock-id-123",
  title: "Default Product Title",
  brand: "Default Brand",
  price: 100,
  salePercentage: 0,
  description: "Mock product description text for engineering evaluation.",
  category: { _id: "cat-1", name: "Default Category" },
  stock: 25,
  images: [],
  colors: [],
  avgRating: 0,
};

/**
 * Custom testing renderer that automatically wraps the card in a BrowserRouter context layer
 * while merging specific prop overrides to keep test cases clean and robust[cite: 290, 332, 333].
 */
const renderCard = (productOverrides: Partial<CustomerProduct> = {}) => {
  const completeMockProduct: CustomerProduct = {
    ...defaultProductBaseline,
    ...productOverrides,
  };

  return render(
    <BrowserRouter>
      <CustomerProductCard product={completeMockProduct} />
    </BrowserRouter>,
  );
};

// ============================================================================
// 🧪 CUSTOMER PRODUCT CARD TEST SUITE
// ============================================================================

describe("CustomerProductCard Behavioral Suite", () => {
  test("renders base core product text and interactive buttons smoothly", () => {
    // ARRANGE & ACT: Merge the fields we care about verifying [cite: 334]
    renderCard({
      title: "Ergonomic Gaming Chair",
      brand: "FlexiSeat",
    });

    // ASSERT: Target elements from a human perspective using exact semantic mappings [cite: 291, 292]
    const productTitle = screen.getByText(/ergonomic gaming chair/i);
    const productBrand = screen.getByText(/flexiseat/i);
    const detailsButton = screen.getByRole("button", { name: /view details/i });

    expect(productTitle).toBeInTheDocument();
    expect(productBrand).toBeInTheDocument();
    expect(detailsButton).toBeInTheDocument();
  });

  test("displays conditional sales badge correctly when a discount is active", () => {
    // ARRANGE & ACT: Set up a product containing a 15% discount parameter [cite: 294, 334]
    renderCard({
      salePercentage: 15,
    });

    // ASSERT: Ensure the ternary layout logic executes successfully
    const saleBadge = screen.getByText("15% OFF");
    expect(saleBadge).toBeInTheDocument();
  });

  test("hides the sales badge if the sale percentage is absolute zero", () => {
    // ARRANGE & ACT: Establish a product selling at standard retail value [cite: 334]
    renderCard({
      salePercentage: 0,
    });

    // ASSERT: queryBy safely returns null instead of throwing an explicit error crash [cite: 16, 114]
    const saleBadge = screen.queryByText(/off/i);
    expect(saleBadge).not.toBeInTheDocument();
  });

  test("processes and renders semantic color swatches up to a safety threshold of 4 items", () => {
    // ARRANGE & ACT: Pass an explicit listing of exactly 3 available product configurations [cite: 429]
    renderCard({
      colors: ["Crimson", "Midnight Blue", "Emerald Green"],
    });

    // ASSERT: Locate swatches through accessibility properties mapped onto the titles
    expect(screen.getByTitle("Crimson")).toBeInTheDocument();
    expect(screen.getByTitle("Midnight Blue")).toBeInTheDocument();
    expect(screen.getByTitle("Emerald Green")).toBeInTheDocument();

    // Verify that the fallback mathematical indicator badge remains hidden [cite: 429]
    const extraIndicator = screen.queryByText(/^\+/);
    expect(extraIndicator).not.toBeInTheDocument();
  });

  test("truncates rendering color arrays and maps numeric balances if colors exceed 4", () => {
    // ARRANGE & ACT: Build a 7-element array to test programmatic clipping limits [cite: 429]
    renderCard({
      colors: ["Red", "Blue", "Green", "Yellow", "Black", "White", "Purple"],
    });

    // ASSERT: Ensure the first 4 array nodes show up inside the visible DOM grid boundaries [cite: 429]
    expect(screen.getByTitle("Red")).toBeInTheDocument();
    expect(screen.getByTitle("Yellow")).toBeInTheDocument();

    // Confirm that the 5th object is safely skipped outside UI rendering bounds [cite: 429]
    expect(screen.queryByTitle("Black")).not.toBeInTheDocument();

    // Confirm calculation logic properly exposes the balance value badge (7 total items - 4 shown = +3) [cite: 429]
    const plusBadge = screen.getByText("+3");
    expect(plusBadge).toBeInTheDocument();
  });
});
