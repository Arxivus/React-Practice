import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { Paths } from 'constants/paths';
import styles from './styles.module.scss'
import backArrow from 'assets/icons/common/back-arrow.svg'
import star from 'assets/icons/common/star.svg'
import eye from 'assets/icons/common/eye.svg'
import fork from 'assets/icons/common/fork.svg'
import point from 'assets/icons/common/point.svg'
import open_issues from 'assets/icons/common/open_issues.svg'
import Button from 'components/ui/Button'
import Loader from 'components/ui/Loader'
import GridCalendar from 'components/dummies/GridCalendar'

interface Branch {
    name: string
    protected: boolean
}

interface Contributor {
    id: number
    avatar_url: string
    weeks: CommitActivity[];
}

interface CommitActivity {
    days: number[];
    total: number;
    week: number;
}


export const RepositoryInfo = () => {
    const { owner, repo } = useParams({ from: `${Paths.REPO_INFO}/$owner/$repo` });
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['repo', owner, repo],
        queryFn: () =>
            axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
                headers: {

                },
            }).then(res => res.data),
    });

    const { data: branches } = useQuery({
        queryKey: ['branches', owner, repo],
        queryFn: () =>
            axios.get<Branch[]>(`https://api.github.com/repos/${owner}/${repo}/branches`, {
                headers: {

                },
            }).then(res => res.data),
    });

    const { data: contributors } = useQuery({
        queryKey: ['contributors', owner, repo],
        queryFn: () =>
            axios.get<Contributor[]>(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
                headers: {

                },
            }).then(res => res.data),

    });

    const { isLoading, data: commit_activity } = useQuery({
        queryKey: ['commit_activity', owner, repo],
        queryFn: async () => {
            const response = await axios.get<CommitActivity[]>(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`, {
                headers: {

                }
            });

            console.log(response.status);
            if (response.status === 202) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                throw new Error('Retrying...');
            }

            return response.data || [];
        }, retry: 3,
    });

    const monthsMap = new Map<string, { date: Date; commits: number }[]>();

    if (commit_activity && Array.isArray(commit_activity)) {
        const allDays = commit_activity.flatMap(week => {
            const date = new Date(week.week * 1000);
            return week.days.map((commits, dayIndex) => {
                const dayDate = new Date(date);
                dayDate.setDate(date.getDate() + dayIndex);
                return {
                    date: dayDate,
                    commits,
                    dayOfWeek: dayIndex,
                };
            });
        });

        allDays.forEach(day => {
            const monthYear = `${day.date.toLocaleString('en-US', { month: 'short' })}`;
            if (!monthsMap.has(monthYear)) {
                monthsMap.set(monthYear, []);
            }
            monthsMap.get(monthYear)?.push({
                date: day.date,
                commits: day.commits,
            });
        });

    }

    return (
        <div className={styles.repoInfoRoot}>
            <div className={styles.repoOwner}>
                <Button onClick={() => navigate({ to: Paths.MAIN })}>
                    <img src={backArrow} alt="Back" />
                </Button>
                <div>
                    <img className={styles.repoAvatar} src={data?.owner.avatar_url}></img>
                    <h3>{data?.name}</h3>
                </div>
            </div>
            <div className={styles.repoInfo}>
                <div className={styles.repoCounters}>
                    <div className={styles.repoCounter}>
                        <img src={star} />
                        <p>{data?.stargazers_count}</p>
                    </div>
                    <div className={styles.repoCounter}>
                        <img src={eye} />
                        <p>{data?.watchers_count}</p>
                    </div>
                    <div className={styles.repoCounter}>
                        <img src={fork} />
                        <p>{data?.forks_count}</p>
                    </div>
                    <div className={styles.repoCounter}>
                        <img src={open_issues} />
                        <p>{data?.open_issues_count}</p>
                    </div>
                </div>
                <div className={styles.repoInfoBlock}>
                    <h2>Description</h2>
                    <p>{data?.description}</p>
                </div>
                <div className={styles.repoContributions}>
                    <h2>Contributions</h2>
                    {monthsMap.size ? (
                        <GridCalendar
                            monthsMap={monthsMap}
                            className={styles.commitCalendar}
                            columnClassName={styles.monthColumn}
                            monthClassName={styles.monthName}
                            daysGridClassName={styles.daysGrid}
                            dayCell={styles.dayCell}>
                        </GridCalendar>
                    ) : (isLoading ? (<Loader color='second' size='m'></Loader>) : (<div></div>))}
                </div>
                <div className={styles.repoContributors}>
                    <h2>Contributors</h2>
                    <ul className={styles.repoContributorsList}>
                        {contributors?.map(contributor => (
                            <li key={contributor.id}>
                                <img src={contributor.avatar_url} />
                            </li>))}
                    </ul>
                </div>
                <div className={styles.repoInfoBlock}>
                    <h2>Branches List</h2>
                    <ul className={styles.repoBranchesList}>
                        {branches?.map(branch => (
                            <li key={branch.name}>
                                <p>{branch.name}</p>
                                {branch.protected && (<span><img src={point}></img>PROTECTED</span>)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RepositoryInfo