import { TopicCourseAppPage } from './app.po';

describe('topic-course-app App', function() {
  let page: TopicCourseAppPage;

  beforeEach(() => {
    page = new TopicCourseAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
