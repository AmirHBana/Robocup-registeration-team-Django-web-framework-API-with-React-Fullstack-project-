import { useState, useEffect } from "react";
import apiInstance from "../../utils/axios.js";
import '../mainpage/CSS/MainPageListOfTeam.css';
function MainPageListOfTeam() {
    const [teamsRegisterList, setTeamsRegisterList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        apiInstance.get('status-teams-main-page').then((res) => {
            setTeamsRegisterList(res.data);
        });
    }, []);

    const filteredTeams = teamsRegisterList.filter(team => {
        return team.name_of_team.includes(searchQuery) || team.league_title.includes(searchQuery);
    });

    return (
        <>
            <div className='d-flex justify-content-between align-items-center' >
                <h3 className='me-4 mb-2 ms-4'><b>اسامی تیم های ثبت نام شده</b></h3>
                <input
                    type="text"
                    placeholder="جستجو..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    style={{
                        padding: '15px 20px',
                        border: '5px solid #ccc',
                        borderRadius: '15px',
                        margin: '15px 1px',
                        width: '100%',
                        maxWidth: '300px',
                        fontSize: '18px'
                    }}
                />
            </div>
            <hr/>
            <br/>
            <div className="d-flex flex-wrap me-4">
                {filteredTeams.map((t, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4"> {/* Adjust column sizes for responsiveness */}
                        <table className="table caption-top styled-table">
                        <thead>
                            <tr>
                                <th scope="col">نام تیم</th>
                                <th scope="col">عضو لیگ</th>
                                <th scope="col">وضعیت ثبت نام</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{t.name_of_team}</td>
                                <td>{t.league_title}</td>
                                <td>ثبت نام شده✅</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MainPageListOfTeam;
