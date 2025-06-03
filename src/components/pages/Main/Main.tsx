import { useState } from 'react';
import MainLayout from 'components/layouts/MainLayout'
import styles from './styles.module.scss'
import card_styles from 'components/dummies/Card/styles.module.scss'
import input_styles from 'components/ui/Input/styles.module.scss'
import icon_btn_styles from 'components/ui/IconButton/styles.module.scss'
import checkbox_styles from 'components/ui/Checkbox/styles.module.scss'
import dropDown_styles from 'components/ui/MultiDropdown/styles.module.scss'
import btn_styles from 'components/ui/Button/styles.module.scss'
import avatar1 from 'assets/icons/common/letter-avatar.svg'
import avatar2 from 'assets/icons/common/fruit-avatar.svg'
import search_icon from 'assets/icons/common/search-icon.svg'
import star from 'assets/icons/common/star.svg'
import Card from 'components/dummies/Card'
import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import Loader from 'components/ui/Loader'
import IconButton from 'components/ui/IconButton'
/* import MultiDropdown from 'components/ui/MultiDropdown' */
/*import Checkbox from 'components/ui/Checkbox'*/


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import { Paths } from 'constants/paths';


const options = [
  { value: '1', label: 'some-organization-name' },
  { value: '2', label: 'git-repo-name' },
  { value: '3', label: 'another-origanization-name' },
  { value: '4', label: 'one-more-organization' },
];

interface Repository {
  id: number
  name: string;
  owner: {
    login: string;
    avatar_url: string
  };
  stargazers_count: number;
  updated_at: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
};

const Main = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data } = useQuery({
    queryKey: ['repos'],
    queryFn: () =>
      axios.get<Repository[]>('https://api.github.com/users/octocat/repos',).then(res => res.data),
  });

  const filteredRepos = data?.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.MouseEvent) => {
    setSearchQuery(searchText.trim());
  };

  return (
    <MainLayout>
      <div className={styles.mainRoot}>
        <div className={styles.repoFindComponents}>
          <Input
            className={input_styles.gitInput}
            placeholder='Enter organization name'
            value={searchText}
            onChange={setSearchText}
          />
          <IconButton
            className={icon_btn_styles.gitIconBtn}
            icon={search_icon}
            onClick={handleSearch}
          />
        </div>

        <div className={styles.repoCardsBlock}>
          {filteredRepos?.map(repo => (
            <Card
              key={repo.id}
              className={card_styles.gitRepoCard}
              image={repo.owner.avatar_url}
              title={repo.name}
              subtitle={repo.owner.login}
              onClick={() => navigate({
                to: `${Paths.REPO_INFO}/$owner/$repo`,
                params: {
                  owner: repo.owner.login,
                  repo: repo.name
                }
              })
              }>
              <div>
                <img src={star} alt="stars" />
                <span>{repo.stargazers_count}</span>
              </div>
              <p>Updated {formatDate(repo.updated_at)}</p>
            </Card>
          ))
          }
        </div>
      </div>
    </MainLayout>
  );
};

export default Main
