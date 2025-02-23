export default function Changelog() {
    return (
        <div className="bg-zinc-950 text-zinc-100 p-6 rounded-lg max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">Latest changes</h2>
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-2.5 top-3 h-[calc(100%-24px)] w-[2px] bg-zinc-800" />

                <ul className="space-y-6 relative">
                    <li className="relative pl-10 group">
                        {/* Timeline dot - Purple */}
                        <div className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-purple-500 bg-purple-500/20 shadow-[0_0_12px_-3px_theme(colors.purple.500)] transition-shadow group-hover:shadow-[0_0_12px_-1px_theme(colors.purple.500)]" />
                        <p className="text-zinc-300 text-sm">Secret scanning changes to how you opt in to notifications</p>
                    </li>

                    <li className="relative pl-10 group">
                        {/* Timeline dot - Blue */}
                        <div className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-blue-500 bg-blue-500/20 shadow-[0_0_12px_-3px_theme(colors.blue.500)] transition-shadow group-hover:shadow-[0_0_12px_-1px_theme(colors.blue.500)]" />
                        <p className="text-zinc-300 text-sm">
                            Code scanning shows more accurate and relevant alerts on pull requests
                        </p>
                    </li>

                    <li className="relative pl-10 group">
                        {/* Timeline dot - Teal */}
                        <div className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-teal-500 bg-teal-500/20 shadow-[0_0_12px_-3px_theme(colors.teal.500)] transition-shadow group-hover:shadow-[0_0_12px_-1px_theme(colors.teal.500)]" />
                        <p className="text-zinc-300 text-sm">SSH Certificate requirements update</p>
                    </li>

                    <li className="relative pl-10 group">
                        {/* Timeline dot - Rose */}
                        <div className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-rose-500 bg-rose-500/20 shadow-[0_0_12px_-3px_theme(colors.rose.500)] transition-shadow group-hover:shadow-[0_0_12px_-1px_theme(colors.rose.500)]" />
                        <p className="text-zinc-300 text-sm">
                            Fixed bug that allowed removed users to retain access to the organization
                        </p>
                    </li>

                    <li className="pl-10">
                        <button className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">View all updates...</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

