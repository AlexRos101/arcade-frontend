import Swal from "sweetalert2"

export const arcadeAlert = (message: string) => {
  Swal.fire({
    text: message
  })
}