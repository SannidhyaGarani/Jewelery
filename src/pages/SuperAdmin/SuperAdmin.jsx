// SuperAdmin.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../../components/Firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SuperAdminAuth from "./SuperAdminAuth";
import { ProductForm } from "../Admin/components/ProductForms";
import MetricCards from "../Admin/components/MetricCards";
import ProductsTable from "../Admin/components/ProductsTable";
import OrdersTable from "../Admin/components/OrdersTable";
import UsersTable from "../Admin/components/UsersTable";
import AdminsTable from "./components/AdminsTable";
import MediaLibrary from "../Admin/components/MediaLibrary";

const sidebarItems = [
  "Dashboard",
  "Products",
  "Orders",
  "Categories",
  "Inventory",
  "Users",
  "Admins",
  "Media",
  "Settings",
];

const metricCards = (productCount, userCount, adminCount) => [
  { label: "Total Products", value: productCount, trend: "In catalog" },
  { label: "Total Users", value: userCount, trend: "Registered" },
  { label: "Total Admins", value: adminCount, trend: "Active team" },
  { label: "Revenue", value: "₹0", trend: "Total platform" },
];

const orderRows = [];

const SuperAdmin = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [adminsList, setAdminsList] = useState([]);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [newAdminId, setNewAdminId] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");
  const [superAdminUser, setSuperAdminUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

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

  const loadAdminsList = async () => {
    try {
      const q = query(collection(db, "admins"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ firestoreId: d.id, ...d.data() }));
      setAdminsList(list);
    } catch (error) {
      console.log("Note: admins collection may not exist yet");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "superadmins", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().role === "superadmin") {
            setSuperAdminUser(user);
          } else {
            await signOut(auth);
            setSuperAdminUser(null);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setSuperAdminUser(null);
        }
      } else {
        setSuperAdminUser(null);
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (superAdminUser) {
      loadProducts();
      loadUsers();
      loadAdminsList();
    }
  }, [superAdminUser]);

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminId || !newAdminPass) return;
    try {
      await addDoc(collection(db, "admins"), {
        adminId: newAdminId,
        password: newAdminPass,
        createdAt: new Date().toISOString()
      });
      setIsAdminModalOpen(false);
      setNewAdminId("");
      setNewAdminPass("");
      loadAdminsList();
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  const renderContentHeader = () => (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Super Admin Panel
        </h1>
        <p className="mt-1 text-sm font-medium tracking-wide text-[#811331] uppercase">
          {activeItem}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-100">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-xs font-medium text-slate-600">
          System status: <span className="font-semibold text-slate-900">Online</span>
        </span>
      </div>
    </header>
  );

  const renderMainContent = () => {
    const cards = metricCards(products.length, users.length, adminsList.length);
    switch (activeItem) {
      case "Products":
        return (
          <>
            <MetricCards cards={cards} />
            <ProductsTable 
              products={products} 
              onAddProduct={() => setIsProductModalOpen(true)}
              onDeleteProduct={handleDeleteProduct}
              onRefresh={loadProducts}
            />
          </>
        );
      case "Orders":
        return (
          <>
            <MetricCards cards={cards} />
            <OrdersTable orders={orderRows} />
          </>
        );
      case "Users":
        return (
          <>
            <MetricCards cards={cards} />
            <UsersTable users={users} />
          </>
        );
      case "Admins":
        return (
          <>
            <MetricCards cards={cards} />
            <AdminsTable 
              adminsList={adminsList} 
              onAddAdmin={() => setIsAdminModalOpen(true)}
              onLoadAdmins={loadAdminsList}
            />
          </>
        );
      case "Media":
        return (
          <MediaLibrary />
        );
      default:
        return (
          <>
            <MetricCards cards={cards} />
            <div className="grid gap-6 lg:grid-cols-2">
              <ProductsTable 
                products={products} 
                onAddProduct={() => setIsProductModalOpen(true)}
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-[#811331]/20 border-t-[#811331] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!superAdminUser) {
    return <SuperAdminAuth onAuthSuccess={(user) => setSuperAdminUser(user)} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-100 bg-white/80 backdrop-blur-sm flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#811331] text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              SA
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                Super Admin
              </p>
              <p className="text-xs text-slate-500">Control Center</p>
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
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
            <p className="truncate" title={superAdminUser?.email}>{superAdminUser?.email}</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="w-full py-2 px-3 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 md:px-10 md:py-8">
        {renderContentHeader()}
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
                  Super admins can upload products directly to the catalog.
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

      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Add New Admin
                </h2>
                <p className="text-xs text-slate-500">
                  Create credentials for the admin panel.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="text-xs font-medium text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-5">
              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1.5">Admin ID</label>
                  <input
                    type="text"
                    required
                    value={newAdminId}
                    onChange={(e) => setNewAdminId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#811331] focus:ring-1 focus:ring-[#811331]"
                    placeholder="e.g. admin_01"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
                  <input
                    type="text"
                    required
                    value={newAdminPass}
                    onChange={(e) => setNewAdminPass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#811331] focus:ring-1 focus:ring-[#811331]"
                    placeholder="Enter password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 bg-[#811331] hover:bg-[#650f27] text-white text-sm font-medium rounded-lg shadow-sm"
                >
                  Create Admin
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
