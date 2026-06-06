import { create, type StoreApi } from "zustand"
import type { Category, Product } from "./types"
import { getAdminCategories, getAdminProducts } from "./api"

type ProductStore = {
  search: string
  page: number
  limit: number
  totalCount: number
  products: Product[]
  categories: Category[]
  loading: boolean
  categoryDialogOpen: boolean
  productDialogOpen: boolean
  editingProduct: Product | null
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setLoading: () => void
  openCreateDialog: () => void
  closeProductDialog: () => void
  openEditDialog: (product: Product) => void
  fetchProducts: (search?: string) => Promise<void>
  fetchCategories: () => Promise<void>
  refreshAll: () => void
  closeEditDialog: () => void
  setCategoryDialogOpen: (data: boolean) => void
  setProductDialogToogle: (data: boolean) => void
}

export const useProductStore = create<ProductStore>((set, get) => ({
  search: "",
  page: 1,
  limit: 5,
  totalCount: 0,
  products: [],
  categories: [],
  loading: true,
  categoryDialogOpen: false,
  productDialogOpen: false,
  editingProduct: null,
  setSearch: (search) => set({ search }),
  setPage: (page) => {
    set({ page })
    get().fetchProducts()
  },
  setLoading: () => set({ loading: true }),
  openCreateDialog: () => {
    get().fetchCategories()

    set({ productDialogOpen: true, editingProduct: null })
  },
  closeProductDialog: () =>
    set({ productDialogOpen: false, editingProduct: null }),
  openEditDialog: (product) =>
    set({ productDialogOpen: true, editingProduct: product }),
  closeEditDialog: () =>
    set({ productDialogOpen: false, editingProduct: null }),
  setCategoryDialogOpen: (open: boolean) => {
    if (open) {
      get().fetchCategories()
    }

    return set({ categoryDialogOpen: open })
  },
  setProductDialogToogle: (open: boolean) => set({ productDialogOpen: open }),
  fetchProducts: async (searchValue?: string) => {
    set({ loading: true })
    const { page, limit, search } = get()
    
    // If a new search is passed, reset to page 1
    const isNewSearch = searchValue !== undefined
    const activeSearch = isNewSearch ? searchValue : search
    const activePage = isNewSearch ? 1 : page
    
    if (isNewSearch) {
      set({ search: searchValue, page: 1 })
    }

    const offset = (activePage - 1) * limit

    try {
      const response = await getAdminProducts(activeSearch, limit, offset)
      set({ products: response.data ?? [], totalCount: response.totalCount })
    } catch {
      console.log("fetching failed")
    } finally {
      set({ loading: false })
    }
  },
  fetchCategories: async () => {
    try {
      set({ loading: true })
      let categories = await getAdminCategories()
      set({ categories })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },

  refreshAll: async () => {
    set({ loading: true })
    const { fetchProducts, fetchCategories } = get()
    // Run both but wait for both to finish
    await Promise.all([fetchProducts(), fetchCategories()])
    set({ loading: false })
  },
}))
