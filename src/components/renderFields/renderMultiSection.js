import React from 'react';
import FontAwesome from 'react-fontawesome';
import ProfileModel from '../util/FrontendModel';
import {Field, FieldArray} from 'redux-form';
import ProjectOtherSection from 'components/Project/Sections/ProjectOtherSection.js';
import References from 'components/Profile/Sections/References';
import {renderFieldArrays} from './index';
import TooltipWrapper from '../util/TooltipWrapper';
import {Grid} from 'semantic-ui-react';


const renderMultiSection = ({ fields, profileDetails, userLanguage, projectIndex, sectionName, projectSpecial,  arrayName, sectionColumns, referenceSpecial, removeName, responsive}) => (
  <ul className="add-field-list">
    {fields.map((member, index) =>
      <div key={index}>
        <li>
          {!projectSpecial && <ProfileModel
          arrayName={`${member}`}
            sectionName={sectionName}
            profileDetails={profileDetails}
            userLanguage={userLanguage}
            responsive={responsive} />}
          {/* Used in reference section on company profile page only*/}
          {referenceSpecial &&
          <Grid>
            <Grid.Column computer={12}>
              <Grid>
                <Grid.Column computer={5}>
                  <TooltipWrapper name={referenceSpecial.projectPartnersRole.name} tooltip={userLanguage === 'German' ? referenceSpecial.projectPartnersRole.germanTooltip : referenceSpecial.projectPartnersRole.englishTooltip}>
                    <div className={referenceSpecial.projectPartnersRole.labelClassName + ' '}>
                      {userLanguage === 'German' ? referenceSpecial.projectPartnersRole.germanLabel : referenceSpecial.projectPartnersRole.englishLabel}
                    </div>
                  </TooltipWrapper>
                </Grid.Column>
                <Grid.Column computer={5}>
                  <TooltipWrapper name={referenceSpecial.projectPartnersName.name} tooltip={userLanguage === 'German' ? referenceSpecial.projectPartnersRole.germanTooltip : referenceSpecial.projectPartnersRole.englishTooltip}>
                    <div className={referenceSpecial.projectPartnersName.labelClassName + ' '}>
                      {userLanguage === 'German' ? referenceSpecial.projectPartnersName.germanLabel : referenceSpecial.projectPartnersName.englishLabel}
                    </div>
                  </TooltipWrapper>
                </Grid.Column>
              </Grid>
              <FieldArray
                name={`${member}.projectPartners`}
                component={renderFieldArrays}
                formName={'ProductServices'}
                sectionName={referenceSpecial}
                userLanguage={userLanguage}
                sectionClassName={'column-collaborators'}
                />
              <div className="references-dimension" />
            </Grid.Column>
          </Grid>
          }
           {projectSpecial &&
          <Grid>
            <Grid.Column computer={12}>
              <FieldArray
                name={`projects[${projectIndex}].otherProjectDescription`}
                component={renderFieldArrays}
                formName={'Projects'}
                sectionName={ProjectOtherSection}
                userLanguage={userLanguage}
                sectionClassName={'column-projects'}
                />
            </Grid.Column>
          </Grid>
          }
          {!projectSpecial && <a
            className="remove-array"
            type="button"
            onClick={() => fields.remove(index)}><FontAwesome name="minus-circle" /> {removeName}
          </a>}
          {!projectSpecial && <div className="profileSection" /> }
        </li>
      </div>
      )}
  </ul>
);

export default renderMultiSection;
