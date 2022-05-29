import { Container, theme } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { MealIcon } from './MealIcon';

export function Header() {
  const { zIndices } = theme;

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
        css={{ height: 72, backdropFilter: 'blur(10px)' }}
        display="flex"
        alignItems="center"
      >
        <Link to="/">
          <MealIcon height={48} width={48} />
        </Link>
      </Container>
    </Container>
  );
}
