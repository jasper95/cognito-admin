import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from 'next/link'
import MuiLink from '@material-ui/core/Link'
import { useRouter } from 'next/dist/client/router'

type IBreadcrumbsProps = {
  crumbs: {
    name: string;
    link?: string
  }[]
}
export default function Breadcrumbs(props: IBreadcrumbsProps) {
  const { crumbs } = props
  const router = useRouter()
  const currentPath = router.asPath;
  const paths = currentPath.split('/')
    .filter(Boolean)
  
  const links = paths.map((path, i) => {
    return `/${paths.slice(0, i + 1).join('/')}`
  })
  return (
    <MuiBreadcrumbs className='text-lg py-4' aria-label="breadcrumb">
      {crumbs.map((crumb, i) => (
        <Link key={crumb.name} href={crumb.link ?? links[i] ?? ''} passHref>
          <MuiLink variant='h6' color={(i === crumbs.length - 1) ? 'primary' : 'inherit'} >
            {crumb.name}
          </MuiLink>
        </Link>
      ))}
    </MuiBreadcrumbs>
  )
}