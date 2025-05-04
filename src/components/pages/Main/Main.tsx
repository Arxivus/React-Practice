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
import MultiDropdown from 'components/ui/MultiDropdown'
import Checkbox from 'components/ui/Checkbox'


const options = [
  { value: '1', label: 'some-organization-name' },
  { value: '2', label: 'git-repo-name' },
  { value: '3', label: 'another-origanization-name' },
  { value: '4', label: 'one-more-organization' },
];


const Main = () => {
  return (
    <MainLayout>
      <div className={styles.mainRoot}>
        <Card className={card_styles.gitRepoCard} image={avatar1} title='git-repo-name' subtitle='git-user'>
          <div>
            <img src={star}></img>
            <span>123</span>
          </div>
          <p>Updated 21 Jul</p>
        </Card>
        <Card className={card_styles.gitRepoCard} image={avatar2} title='very-long-repository-name-and-other' subtitle='git-user'>
          <div>
            <img src={star}></img>
            <span>123</span>
          </div>
          <p>Updated 21 Jul</p>
        </Card>
        <Input className={input_styles.gitInput} placeholder='Enter organization name'></Input>
        <Button className={btn_styles.gitButton}>
          <p>Send</p>
        </Button>
        <Button className={btn_styles.gitButton} loading={true}>
          <Loader></Loader>
          <p>Send</p>
        </Button>
        <IconButton className={icon_btn_styles.gitIconBtn} icon={search_icon}></IconButton>

        <MultiDropdown options={options} optionsClassName={dropDown_styles.gitDropDownOptions} selectClassName={dropDown_styles.gitDropDownSelect}></MultiDropdown>

        <Loader color='second' size='I'></Loader>
        <Loader color='second' size='m'></Loader>
        <Loader color='second' size='s'></Loader>
        <Checkbox className={checkbox_styles.gitCheckbox}></Checkbox>
      </div>
    </MainLayout >
  )
}

export default Main
