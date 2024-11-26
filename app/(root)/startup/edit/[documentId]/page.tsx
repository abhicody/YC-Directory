// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
// import EditStartup from "@/components/EditStartup";

// const Page = async () => {
//   const session = await auth();

//   if (!session) redirect("/");

//   return (
//     <>
//       <section className="pink_container !min-h-[230px]">
//         <h1 className="heading">Edit Your Startup</h1>
//       </section>

//       <EditStartup />
//     </>
//   );
// };

// export default Page;

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EditStartup from "@/components/EditStartup";

const Page = async ({ params }) => {
  const session = await auth();

  if (!session) redirect("/");

  const { documentId } = params;

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Edit Your Startup</h1>
      </section>

      <EditStartup documentId={documentId} />
    </>
  );
};

export default Page;
