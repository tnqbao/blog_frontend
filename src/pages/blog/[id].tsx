import { useRouter } from 'next/router'

interface Props {
  res: {
    content: string;
  }
}
 
export default function Page(props: Props) {
  const router = useRouter()
  return <p>Post: {router.query.slug}, {props.res.content}</p>
}

export async function getServerSideProps(params: any) {
  const res = await fetch(`http://127.0.0.1:3000/api/blog${params.params.id}`);

  return { props: { res: await res.json() } }
}