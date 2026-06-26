import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Prestations from './pages/Prestations'
import Catalogue from './pages/Catalogue'
import Informations from './pages/Informations'
import Reservation from './pages/Reservation'
import Annulation from './pages/Annulation'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminReservations from './pages/admin/AdminReservations'
import AdminGalerie from './pages/admin/AdminGalerie'
import AdminPrestations from './pages/admin/AdminPrestations'
import AdminDisponibilites from './pages/admin/AdminDisponibilites'

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-esse-noir">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Accueil /></PublicLayout>} />
      <Route path="/prestations" element={<PublicLayout><Prestations /></PublicLayout>} />
      <Route path="/catalogue" element={<PublicLayout><Catalogue /></PublicLayout>} />
      <Route path="/informations" element={<PublicLayout><Informations /></PublicLayout>} />
      <Route path="/reservation" element={<PublicLayout><Reservation /></PublicLayout>} />
      <Route path="/annuler/:token" element={<PublicLayout><Annulation /></PublicLayout>} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="reservations" element={<AdminReservations />} />
        <Route path="galerie" element={<AdminGalerie />} />
        <Route path="prestations" element={<AdminPrestations />} />
        <Route path="disponibilites" element={<AdminDisponibilites />} />
      </Route>
    </Routes>
  )
}