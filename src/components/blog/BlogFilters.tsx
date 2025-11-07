import { Button } from "@/components/ui/button";

interface BlogFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'Все' },
  { id: 'guides', label: 'Гайды' },
  { id: 'cases', label: 'Кейсы' },
  { id: 'analytics', label: 'Аналитика' },
  { id: 'trends', label: 'Тренды' }
];

export const BlogFilters = ({ activeFilter, onFilterChange }: BlogFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'default' : 'outline'}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
