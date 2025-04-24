export const dynamic = "force-dynamic";

import { getCategories } from "@/actions/category";
import { DataTable } from "@/components/data-table";
import { Header } from "@/components/header";
import { columns } from "./components/columns";
import { CategoryForm } from "./components/category-form";
import { Suspense } from "react";
import Loader from "@/components/loader";

const page = async () => {
    const fetchcategories = await getCategories(false);

    if (!fetchcategories.success) {
        return (
            <div className='flex flex-col'>
                <Header title="Categories" desc="Manage and organize categories efficiently." />
                <p className="text-red-500">Error: {fetchcategories.message}</p>
            </div>
        );
    }

    return (
        <Suspense fallback={<Loader />}>

            <div className='flex flex-col'>
                <Header title="Categories" desc="Manage and organize categories efficiently." />
                <div className="grid grid-cols-1  md:grid-cols-2 gap-7 mt-7">
                    <div className="order-2 md:order-1">
                        <DataTable searchKey='id' columns={columns} data={fetchcategories.categories || []} />
                    </div>
                    <div className="py-4 order-1 md:order-2">
                        <CategoryForm />

                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default page;
