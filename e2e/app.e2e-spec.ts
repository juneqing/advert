import { MaterialAdminPage } from './app.po';

describe('material-admin App', () => {
  let page: MaterialAdminPage;

  beforeEach(() => {
    page = new MaterialAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
