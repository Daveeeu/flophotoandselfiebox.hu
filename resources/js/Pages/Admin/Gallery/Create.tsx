import GalleryForm from '@/Components/GalleryForm';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CreateGalleryImage() {
    return (
        <AdminLayout
            title="Új galériaelem"
            description="Új kép feltöltése vagy külső URL megadása a publikus galériához."
        >
            <GalleryForm
                title="Új galériaelem"
                submitLabel="Kép mentése"
                action={route('admin.gallery.store')}
            />
        </AdminLayout>
    );
}
