import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);
export const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export const ToastError = (title: string, text: string) => {
    return Toast.fire({
        icon: "error",
        title: title,
        text: text,
    });
}

export const ToastSuccess = (title: string, text: string) => {
    return Toast.fire({
        icon: "success",
        title: title,
        text: text,
    });
}