import '../css/reportcard.css'

export default function ReportCard({ values }) {
    return (
      <>
        {values.map((item, index) => (
          <div key={index} className="report-card">
            {item.icon}
            <p className="report-card__text">{item.text}</p>
          </div>
        ))}
      </>
    );
  }

