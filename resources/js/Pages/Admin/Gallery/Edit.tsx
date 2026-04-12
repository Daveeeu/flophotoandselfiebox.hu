import GalleryForm from '@/Components/GalleryForm';
import AdminLayout from '@/Layouts/AdminLayout';

type EditGalleryImageProps = {
    image: {
        id: number;
        title: string;
        category: string | null;
        description: string | null;
        alt_text: string | null;
        image_url: string;
        image_path: string;
        is_external: boolean;
        is_published: boolean;
        sort_order: number;
    };
};

export default function EditGalleryImage({ image }: EditGalleryImageProps) {
    return (
        <AdminLayout
            title="Galériaelem szerkesztése"
            description="A kép metaadatai, publikálási állapota és forrása itt frissíthető."
        >
            <GalleryForm
                title="Galériaelem szerkesztése"
                submitLabel="Módosítás mentése"
                action={route('admin.gallery.update', image.id)}
                method="patch"
                image={image}
            />
        </AdminLayout>
    );
}
