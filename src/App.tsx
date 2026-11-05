import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { Dashboard } from './components/Dashboard';
import { BookCatalog } from './components/BookCatalog';
import { CalendarView } from './components/CalendarView';
import { MyReservations } from './components/MyReservations';
import { UserManagement } from './components/UserManagement';
import { AuthModal } from './components/AuthModal';
import { BookDetailModal } from './components/BookDetailModal';
import { BookFormModal } from './components/BookFormModal';
import { LabReservationModal } from './components/LabReservationModal';
import { Book } from './types';
import { BookOpen } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, currentUser } = useApp();

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedBookForDetail, setSelectedBookForDetail] = useState<Book | null>(null);
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  // Lab Reservation Modal state
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [prefilledLabId, setPrefilledLabId] = useState<string | undefined>();
  const [prefilledDate, setPrefilledDate] = useState<string | undefined>();
  const [prefilledSlot, setPrefilledSlot] = useState<string | undefined>();

  const handleOpenNewLabReservation = (labId?: string, date?: string, slot?: string) => {
    setPrefilledLabId(labId);
    setPrefilledDate(date);
    setPrefilledSlot(slot);
    setIsLabModalOpen(true);
  };

  const handleOpenAddBook = () => {
    setBookToEdit(null);
    setIsBookFormOpen(true);
  };

  const handleOpenEditBook = (book: Book) => {
    setBookToEdit(book);
    setIsBookFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <ToastContainer />
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'inicio' && (
          <Dashboard 
            onSelectBook={book => setSelectedBookForDetail(book)}
            onOpenNewLabReservation={handleOpenNewLabReservation}
          />
        )}

        {activeTab === 'acervo' && (
          <BookCatalog 
            onSelectBook={book => setSelectedBookForDetail(book)}
            onOpenAddBookModal={handleOpenAddBook}
            onOpenEditBookModal={handleOpenEditBook}
          />
        )}

        {activeTab === 'calendario' && (
          <CalendarView 
            onOpenNewLabReservation={handleOpenNewLabReservation}
          />
        )}

        {activeTab === 'reservas' && (
          <MyReservations />
        )}

        {activeTab === 'usuarios' && (
          <UserManagement />
        )}
      </main>

      {/* Quiet, Human Editorial Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">BiblioLab Escolar</span>
            <span className="text-slate-300">·</span>
            <span>Centro Integrado de Leitura e Ciências</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <span>Turnos Matutino, Vespertino e Noturno (Aulas de 50 min)</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span>Ensino Fundamental II e Médio</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <BookDetailModal 
        book={selectedBookForDetail} 
        onClose={() => setSelectedBookForDetail(null)} 
      />

      <BookFormModal 
        isOpen={isBookFormOpen}
        onClose={() => setIsBookFormOpen(false)}
        bookToEdit={bookToEdit}
      />

      <LabReservationModal
        isOpen={isLabModalOpen}
        onClose={() => setIsLabModalOpen(false)}
        initialLabId={prefilledLabId}
        initialDate={prefilledDate}
        initialSlot={prefilledSlot}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
