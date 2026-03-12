import { ContentItem } from '../data';
import { ContentCard } from './ContentCard';
import { ChevronRight } from 'lucide-react';

export function ContentSection({ title, items, onWatch }: { key?: string | number, title: string, items: ContentItem[], onWatch: (title: string) => void }) {
  if (items.length === 0) return null;
  
  return (
    <section className="py-4">
      <div className="px-4 flex items-center justify-between mb-3">
        <h2 className="font-display text-2xl tracking-wider text-gradient">{title}</h2>
        <button className="text-gray-400 hover:text-white flex items-center text-xs font-medium transition-colors">
          See All <ChevronRight size={14} />
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar snap-x snap-mandatory">
        {items.map((item, i) => (
          <div key={item.id} className="snap-start">
            <ContentCard item={item} onWatch={onWatch} />
          </div>
        ))}
      </div>
    </section>
  );
}
