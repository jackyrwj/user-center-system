import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-layout';
import {PLANET_LINK} from "@/constants";

const Footer: React.FC = () => {
  const defaultMessage = 'jackyrwj出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        // {
        //   key: 'planet',
        //   title: '知识星球',
        //   href: PLANET_LINK,
        //   blankTarget: true,
        // },
        {
          key: 'codeNav',
          title: '个人博客',
          href: PLANET_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined/> Jackyrwj GitHub</>,
          href: 'https://github.com/jackyrwj',
          blankTarget: true,
        },

      ]}
    />
  );
};

export default Footer;
