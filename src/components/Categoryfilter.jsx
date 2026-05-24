export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        let style;
        if (selected === cat) {
          style = "bg-[#FF4F1A] text-white shadow-md scale-105";
        } else {
          style = "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200";
        }

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${style}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
