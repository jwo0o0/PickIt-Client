"use client";

export const ContentTitle = ({ title }: { title: string }) => {
  return (
    <div
      className="h-12 bg-white border-b border-b-slate-300 absolute top-0 right-0 left-0
            flex items-center py-2 px-6
        "
    >
      <div className="text-slate-900 font-semibold">{title}</div>
    </div>
  );
};
