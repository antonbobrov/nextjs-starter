export interface ILexicon {
  siteName: string;
  copyright: string;

  navigation: {
    close: string;
    breadcrumbs: string;
  };

  menu: {
    open: string;
    close: string;
  };
}
