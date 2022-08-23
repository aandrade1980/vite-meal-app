/** Component */
import { Avatar, Container, theme } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';

/** Icons */
import { MealIcon } from './MealIcon';

/** Hooks */
import { useUserStore } from '../store';

export function Header() {
  const user = useUserStore(state => state.user);
  const logout = useUserStore(state => state.logout);

  const navigate = useNavigate();

  const { zIndices } = theme;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container
      as="header"
      xl
      css={{
        position: 'sticky',
        top: 0,
        background: 'transparent',
        zIndex: zIndices.max,
        boxShadow: 'rgb(2 1 1 / 10%) 0px 5px 20px -5px'
      }}
    >
      <Container
        xl
        as="nav"
        css={{ height: 80, backdropFilter: 'blur(10px)' }}
        display="flex"
        alignItems="center"
        justify="space-between"
      >
        <Link to="/">
          <MealIcon height={48} width={48} />
        </Link>
        {user && (
          <Avatar
            pointer
            src={user?.photoURL || 'https://via.placeholder.com/120'}
            size="lg"
            onClick={handleLogout}
          />
        )}
      </Container>
    </Container>
  );
}
