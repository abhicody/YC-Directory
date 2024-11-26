// "use client";

// import { useState } from "react";
// import { Button } from "./ui/button";

// export default function DeleteButton({ documentId }: { documentId: string }) {
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDelete = async () => {
//     setIsDeleting(true);

//     try {
//       const response = await fetch("/api/deleteDocument", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: documentId }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete document");
//       }

//       alert("Document deleted successfully");
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while deleting the document");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <Button
//       className="startup-card_btn"
//       onClick={handleDelete}
//       disabled={isDeleting}
//     >
//       {isDeleting ? "Deleting..." : "Delete"}
//     </Button>
//   );
// }
