import '../css/screenheader.css';

function ScreenHeader({
  title = "Hey the title is missing",
  description = "Hey, you forgot the description.",
}) {
  return (
    <header className="screen-header">
      <h1 className="screen-header__title">{title}</h1>
      <h2 className="screen-header__description">{description}</h2>
    </header>
  );
}

export default ScreenHeader;