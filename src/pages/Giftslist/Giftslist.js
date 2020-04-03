import React, { Fragment, useState } from "react";
import Gift from "../../components/Gift/Gift";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import Searchbar from "../../components/Searchbar/Searchbar";
import { NoResults } from "../../components/NoResults/NoResults";
import CustomizedSlider from "../../components/Slider/Slider";
import Grid from "@material-ui/core/Grid";

const GiftList = function (props) {
  const [searchInput, setSearchInput] = useState("");
  const [isEmpty, setIsEmtpy] = useState(false);
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const {
    gifts,
    toggleFavorite,
    handleClickOpen,
    giftsPerPage,
    handleChangeGiftsPerPage,
    handleChangePage,
    page,
  } = props;

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          flexBasis: "100%",
        }}
      >
        <Grid item xs={10} sm={10} md={4} lg={3} justify-content="center">
          <Searchbar handleChange={handleChange} />
        </Grid>
        <Grid item xs={10} sm={10} md={4} lg={3} justify-content="center">
          <CustomizedSlider />
        </Grid>
        <Grid item xs={10} sm={10} md={4} lg={3} justify-content="center">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Gifts"
            component="div"
            count={gifts.length}
            rowsPerPage={giftsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeGiftsPerPage}
            align="left"
            style={{ minWidth: 320 }}
          />
        </Grid>
      </div>
      {gifts
        ?.slice(page * giftsPerPage, page * giftsPerPage + giftsPerPage)
        .filter(
          (gift) =>
            gift.name.toLowerCase().includes(searchInput.toLocaleLowerCase()) ||
            gift.category
              .toLowerCase()
              .includes(searchInput.toLocaleLowerCase())
        )
        .map((gift, i) => (
          <Gift
            key={i}
            toggleFavorite={toggleFavorite}
            item={gift}
            handleClickOpen={() => handleClickOpen(gift)}
          />
        ))}
    </Fragment>
  );
};

export default GiftList;
