import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SubjectsPage from './pages/SubjectsPage';
import BookingPage from './pages/BookingPage';
import DemoBookingPage from './pages/DemoBookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/demo-booking" element={<DemoBookingPage />} />
            <Route
              path="/demo-booking/confirmation"
              element={<BookingConfirmationPage />}
            />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}
