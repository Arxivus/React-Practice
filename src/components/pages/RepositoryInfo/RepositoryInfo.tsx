import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { Paths } from 'constants/paths';
import styles from './styles.module.scss'
import backArrow from 'assets/icons/common/back-arrow.svg'
import Button from 'components/ui/Button'

interface Branch {
    name: string
}

export const RepositoryInfo = () => {
    const { owner, repo } = useParams({ from: `${Paths.REPO_INFO}/$owner/$repo` });
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['repo', owner, repo],
        queryFn: () =>
            axios.get(`https://api.github.com/repos/${owner}/${repo}`).then(res => res.data),
    });

    const { data: branches } = useQuery({
        queryKey: ['branches', owner, repo],
        queryFn: () =>
            axios.get<Branch[]>(`https://api.github.com/repos/${owner}/${repo}/branches`)
                .then(res => res.data),
    });

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
                <div className={styles.repoInfoBlock}>
                    <h2>Description</h2>
                    <div className={styles.line}></div>
                    <p>{data?.description}</p>
                </div>
                <div className={styles.repoInfoBlock}>
                    <h2>Branches List</h2>
                    <div className={styles.line}></div>
                    <ul className={styles.repoBranchesList}>
                        {branches?.map(branch => (
                            <li key={branch.name}>{branch.name}</li>))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RepositoryInfo