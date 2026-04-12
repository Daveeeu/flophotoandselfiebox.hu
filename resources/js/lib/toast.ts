import Swal from 'sweetalert2';

export function showToast(
    icon: 'success' | 'error' | 'info' | 'warning',
    title: string,
) {
    void Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2800,
        timerProgressBar: true,
        icon,
        title,
        customClass: {
            popup: 'rounded-2xl',
        },
    });
}

export async function confirmAction(options: {
    title: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}) {
    return Swal.fire({
        icon: 'warning',
        title: options.title,
        text: options.text,
        showCancelButton: true,
        confirmButtonText: options.confirmButtonText ?? 'Igen',
        cancelButtonText: options.cancelButtonText ?? 'Mégse',
        reverseButtons: true,
        customClass: {
            popup: 'rounded-3xl',
            confirmButton:
                'bg-rose-600 text-white px-4 py-2 rounded-xl mx-2',
            cancelButton:
                'bg-slate-200 text-slate-900 px-4 py-2 rounded-xl mx-2',
        },
        buttonsStyling: false,
    });
}
