type Song = {
  result: {
    id: string;
    full_title: string;
    header_image_thumbnail_url: string;
    url: string;
  };
};

type Analysis = {
  emotion: {
    document: {
      emotion: {
        [key: string]: string;
      };
    };
  };
  sentiment: {
    document: {
      score: string;
    };
  };
};
