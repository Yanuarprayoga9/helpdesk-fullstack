export const dynamic = "force-dynamic";

import { getCategories } from "@/@data/category";
import { DataTable } from "@/components/data-table";
import { Header } from "@/components/header";
import { columns } from "./components/columns";
import { CategoryForm } from "./components/category-form";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { ConsoleWrapper } from "@/components/layouts/console-wrapper";
import { ConsoleContainer } from "@/components/layouts/console-container";

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
            <ConsoleContainer
                title="Categories"
                desc="Manage all your categories in one place. Organize, edit, and create categories efficiently."
            >
                <ConsoleWrapper
                    title="Category List"
                    desc="List of your categories"
                    className="lg:w-8/12"
                >
                    <DataTable searchKey='id' columns={columns} data={fetchcategories.categories || []} />
                </ConsoleWrapper>
                <ConsoleWrapper
                    title="Create Category"
                    desc="Add a new category to organize your data"
                    className="lg:w-1/4"
                >
                    <CategoryForm />
                </ConsoleWrapper>
            </ConsoleContainer>
        </Suspense>
    );
};

export default page;
