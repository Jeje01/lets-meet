export const Tag = ({text}: {text: string}) =>{
  return (
    <li className="rounded px-[6px] py-1 bg-white list-none w-fit text-[14px] font-normal inline-block">
      {text}
    </li>
  )
}