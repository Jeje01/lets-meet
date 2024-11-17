import { Tag } from "../Tag";

export const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag text={tag} key={tag} />
      ))}
    </ul>
  );
}