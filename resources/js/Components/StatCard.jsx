export default function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconBg = 'bg-[#E4F3EE]',
    iconColor = 'text-[#043927]',
    trend,
    trendUp = true,
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#16A085]/10">

            <div className="flex items-start justify-between">

                <div>
                    <p className="text-xs font-medium text-gray-400">
                        {title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                        {value}
                    </h3>
                </div>

                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
                >
                    <Icon
                        size={19}
                        className={iconColor}
                    />
                </div>

            </div>

            <div className="mt-4 flex items-center gap-2">

                {trend && (
                    <span
                        className={`text-[10px] font-semibold ${trendUp
                                ? 'text-emerald-600'
                                : 'text-red-500'
                            }`}
                    >
                        {trend}
                    </span>
                )}

                {description && (
                    <span className="text-[10px] text-gray-400">
                        {description}
                    </span>
                )}

            </div>
        </div>
    );
}