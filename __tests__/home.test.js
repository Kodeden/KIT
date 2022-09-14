import { render, fireEvent } from "@testing-library/react-native";
import App from "../App";
import mockAsyncStorage from '../__mocks__/@react-native-async-storage/async-storage.js';

describe("App Navigation Testing", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("render list page upon startup", async () => {
    const { findByPlaceholderText, findByTestId } = render(<App />);
    const filterPresent = await findByPlaceholderText(/Filter Friends/);
    expect(filterPresent).toBeTruthy();
    const helpButton = await findByTestId("helpButton");
    expect(helpButton).toBeTruthy();
    const newFriendButton = await findByTestId("newFriendButton");
    expect(newFriendButton).toBeTruthy();
    const profileButtonPresent = await findByTestId("JohnProfile");
    expect(profileButtonPresent).toBeTruthy();
  });

  
  it("navigate to profile screen", async () => {
    const { findByTestId, findByText } = render(<App />);
    const profileButton = await findByTestId("JohnProfile");
    fireEvent.press(profileButton);
    const profileTitle = await findByText(/'s Profile/);
    expect(profileTitle).toBeTruthy();
  });

    
  it("navigate to new friend screen", async () => {
    const { findByTestId, findByText } = render(<App />);
    const newFriendButton = await findByTestId("newFriendButton");
    fireEvent.press(newFriendButton);
    const nameInput = await findByTestId("firstNameInput");
    expect(nameInput).toBeTruthy();
  });

});
