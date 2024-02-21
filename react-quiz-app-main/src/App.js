import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import FinalScreen from "./pages/FinalScreen";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  return (
    <Router>
      <Container maxWidth="sm" style={{ marginTop:"180px",backgroundColor: "pink", padding: "20px" }}>
        <Box textAlign="center" mt={2} mb={3}>
          <Switch>
            <Route path="/" exact>
              <Typography variant="h3" fontWeight="bold">
                Puzzlex
              </Typography>
              <Settings />
            </Route>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/score">
              <FinalScreen />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
