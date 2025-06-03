export enum Paths {
  MAIN = '/',
  NOT_FOUND = '/404',
  REPO_INFO = '/repo'
}

type Pathnames = {
  [key in Paths]: string
}

export const PathsNames: Pathnames = {
  [Paths.MAIN]: 'common:pathnames.main',
  [Paths.NOT_FOUND]: 'common:pathnames.notFound',
  [Paths.REPO_INFO]: 'common:pathnames.repoInfo'
}
