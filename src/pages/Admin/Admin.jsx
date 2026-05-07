// Admin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../../components/Firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import AdminAuth from "./AdminAuth";
import MetricCards from "./components/MetricCards";
import ProductsTable from "./components/ProductsTable";
import OrdersTable from "./components/OrdersTable";
import UsersTable from "./components/UsersTable";
import CategoriesOverview from "./components/CategoriesOverview";
import { ProductForm, EditProductForm } from "./components/ProductForms";
import MediaLibrary from "./components/MediaLibrary";

const sidebarItems = ["Dashboard", "Products", "Orders", "Categories", "Users", "Media"];

const metricCards = [
  { label: "Active Products", value: "864", hint: "Across all categories" },
  { label: "Open Orders", value: "214", hint: "Awaiting fulfillment" },
  { label: "Today’s Revenue", value: "₹4,92,000", hint: "Live store total" },
];

const orderRows = [
  { id: "#98234", customer: "Ariana Dell", total: "₹12,400.00", status: "Paid" },
  { id: "#98215", customer: "Michael Lee", total: "₹8,900.00", status: "Pending" },
  { id: "#98198", customer: "Sofia Park", total: "₹21,200.00", status: "Shipped" },
];

const Admin = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [users, setUsers] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("velouraz_admin");
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
    setLoadingAuth(false);
  }, []);

  const handleAuthSuccess = (user) => {
    setAdminUser(user);
    localStorage.setItem("velouraz_admin", JSON.stringify(user));
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem("velouraz_admin");
  };

  const loadProducts = async () => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setProducts(list);
  };

  const loadUsers = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setUsers(list);
    } catch (error) {
      console.log("Note: Users collection may not exist yet or error fetching users");
    }
  };

  useEffect(() => {
    if (adminUser) {
      loadProducts();
      loadUsers();
    }
  }, [adminUser]);

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const renderHeader = () => (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Admin Panel
        </h1>
        <p className="mt-1 text-sm font-medium tracking-wide text-[#811331] uppercase">
          {activeItem}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-100">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-xs font-medium text-slate-600">
          Store status:{" "}
          <span className="font-semibold text-slate-900">Operational</span>
        </span>
      </div>
    </header>
  );

  const renderMainContent = () => {
    switch (activeItem) {
      case "Products":
        return (
          <>
            <MetricCards cards={metricCards} />
            <ProductsTable
              products={products}
              onAddProduct={() => setIsProductModalOpen(true)}
              onEditProduct={handleEditClick}
              onDeleteProduct={handleDeleteProduct}
              onRefresh={loadProducts}
            />
          </>
        );
      case "Orders":
        return (
          <>
            <MetricCards cards={metricCards} />
            <OrdersTable orders={orderRows} />
          </>
        );
      case "Categories":
        return (
          <>
            <MetricCards cards={metricCards} />
            <CategoriesOverview />
          </>
        );
      case "Users":
        return (
          <>
            <MetricCards cards={metricCards} />
            <UsersTable users={users} />
          </>
        );
      case "Media":
        return (
          <MediaLibrary />
        );
      default:
        return (
          <>
            <MetricCards cards={metricCards} />
            <div className="grid gap-6 lg:grid-cols-2">
              <ProductsTable
                products={products}
                onAddProduct={() => setIsProductModalOpen(true)}
                onEditProduct={handleEditClick}
                onDeleteProduct={handleDeleteProduct}
                onRefresh={loadProducts}
              />
              <OrdersTable orders={orderRows} />
            </div>
          </>
        );
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!adminUser) {
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-100 bg-white/80 backdrop-blur-sm flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#811331] text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                Admin
              </p>
              <p className="text-xs text-slate-500">Store Workspace</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = item === activeItem;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setActiveItem(item)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? "bg-[#811331]/10 text-[#811331]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                <span>{item}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#811331]" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-slate-100 flex flex-col gap-3">
          <div className="text-xs text-slate-500">
            <p className="font-medium text-slate-700">Session</p>
            <p className="truncate" title={adminUser?.adminId}>{adminUser?.adminId}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 md:px-10 md:py-8">
        {renderHeader()}
        {renderMainContent()}
      </main>

      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Add New Product
                </h2>
                <p className="text-xs text-slate-500">
                  Fill in the details and upload images for this product.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="text-xs font-medium text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-5">
              <ProductForm
                onSuccess={async () => {
                  setIsProductModalOpen(false);
                  await loadProducts();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Edit Product
                </h2>
                <p className="text-xs text-slate-500">
                  Update product details and save changes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-xs font-medium text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-5">
              <EditProductForm
                product={editingProduct}
                onSuccess={async () => {
                  setIsEditModalOpen(false);
                  setEditingProduct(null);
                  await loadProducts();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;






