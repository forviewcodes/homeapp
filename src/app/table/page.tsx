"use client";
export const runtime = "edge";

export default function AboutPage() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Budget Overview</h1>

            {/* Essentials Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Essentials</h2>
                <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Item</th>
                            <th className="px-4 py-2 text-right">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100">
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">House Rent</td>
                            <td className="px-4 py-2 text-right">$1600</td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">Parking Rent</td>
                            <td className="px-4 py-2 text-right">$150</td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="px-4 py-2">3</td>
                            <td className="px-4 py-2">KiddoCare</td>
                            <td className="px-4 py-2 text-right">$700</td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="px-4 py-2">4</td>
                            <td className="px-4 py-2">Belanja Dalila</td>
                            <td className="px-4 py-2 text-right">$900</td>
                        </tr>
                        <tr className="hover:bg-gray-100 font-semibold bg-gray-100">
                            <td className="px-4 py-2" colSpan={2} >Total</td>
                            <td className="px-4 py-2 text-right">$4650</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Food and Entertainment Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Food and Entertainment</h2>
                <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Item</th>
                            <th className="px-4 py-2 text-right">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100">
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">Mix</td>
                            <td className="px-4 py-2 text-right">$2000</td>
                        </tr>
                        <tr className="hover:bg-gray-100 font-semibold bg-gray-100">
                            <td className="px-4 py-2" colSpan={2}>Total</td>
                            <td className="px-4 py-2 text-right">$2000</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Additional Sections */}
            {/* Repeat the above structure for Utilities, Transport, Health, Total Budget, and Savings */}
            {/* Each section will have Tailwind classes and consistent styling */}

            {/* Total Budget Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Budget</h2>
                <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Item</th>
                            <th className="px-4 py-2 text-right">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100 font-semibold bg-gray-100">
                            <td className="px-4 py-2" colSpan={2} >Overall Total</td>
                            <td className="px-4 py-2 text-right">$21740</td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </div>
    );
}
