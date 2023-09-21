export interface ILexicon {
  siteName: string;
  copyright: string;

  preloader: {
    label: string;
  };

  navigation: {
    close: string;
    breadcrumbs: string;
  };

  menu: {
    open: string;
    close: string;
  };
}
