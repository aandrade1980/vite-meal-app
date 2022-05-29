/** Components */
import { Button, Card, Container, Row, Text } from '@nextui-org/react';

/** Icons */
import { FcGoogle } from 'react-icons/fc';

/** Context */
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { login } = useAuth();

  return (
    <Container display="flex" css={{ mt: 64, minHeight: 250 }}>
      <Card>
        <Row justify="center">
          <Text as="h1">Welcome to Meal App</Text>
        </Row>
        <Card.Footer>
          <Row justify="center" css={{ mb: 16 }}>
            <Button
              icon={<FcGoogle fill="currentColor" />}
              size="sm"
              flat
              auto
              color="primary"
              onPress={login}
            >
              Continue with Google
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}
