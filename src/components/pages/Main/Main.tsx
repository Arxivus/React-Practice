import { useState } from 'react';
import MainLayout from 'components/layouts/MainLayout'
import styles from './styles.module.scss'
import card_styles from 'components/dummies/Card/styles.module.scss'
import input_styles from 'components/ui/Input/styles.module.scss'
import icon_btn_styles from 'components/ui/IconButton/styles.module.scss'
import dropDown_styles from 'components/ui/MultiDropdown/styles.module.scss'
import search_icon from 'assets/icons/common/search-icon.svg'
import star from 'assets/icons/common/star.svg'
import Card from 'components/dummies/Card'
import Input from 'components/ui/Input'
import IconButton from 'components/ui/IconButton'
import MultiDropdown from 'components/ui/MultiDropdown'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import { Paths } from 'constants/paths';
import Loader from 'components/ui/Loader';



const options = [
  { value: 'C', label: 'C' },
  { value: 'C++', label: 'C++' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'JavaScript', label: 'JavaScript' },
];

interface Repository {
  id: number
  name: string;
  language: string | null;
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
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const { isLoading, data } = useQuery({
    queryKey: ['repos'],
    queryFn: () =>
      axios.get<Repository[]>('https://api.github.com/orgs/facebook/repos', {
        headers: {

        },
      }).then(res => res.data),
  });


  const handleSearch = (e: React.MouseEvent) => {
    setSearchQuery(searchText.trim());
  };

  const handleLanguageSelect = (selected: string[]) => {
    setSelectedLanguages(selected);
  };

  const filteredRepos = data?.filter(repo => {
    const nameMatch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());

    const languageMatch = selectedLanguages.length === 0 ||
      (repo.language && selectedLanguages.includes(repo.language));
    return nameMatch && languageMatch;
  });

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

        <div className={styles.repoDropDownSelection}>
          <h2>Repositories</h2>
          <MultiDropdown
            options={options}
            optionsClassName={dropDown_styles.gitDropDownOptions}
            selectClassName={dropDown_styles.gitDropDownSelect}
            value={selectedLanguages}
            onChange={handleLanguageSelect}
            placeholder='Languages'>
          </MultiDropdown>
        </div>
        <div className={styles.repoCardsBlock}>
          {(isLoading) ? (<Loader color='second' size='I'></Loader>) : (filteredRepos?.map(repo => (
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
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Main
