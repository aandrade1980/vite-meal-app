/** Component */
import { Avatar, Container, theme } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

/** Context */
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { zIndices } = theme;
  const { user } = useAuth();

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
          <Player
            // TODO: Move to env file or config file
            src="https://assets1.lottiefiles.com/packages/lf20_kplouxqz.json"
            loop
            autoplay
            style={{ height: 80, width: 80 }}
          />
        </Link>
        {user && (
          <Avatar
            src={user.photoURL || 'https://via.placeholder.com/120'}
            size="lg"
          />
        )}
      </Container>
    </Container>
  );
}
